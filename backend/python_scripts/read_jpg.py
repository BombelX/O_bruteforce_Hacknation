import os
import pytesseract
from img2table.document import Image as Img2TableImage
from img2table.document import PDF as Img2TablePDF
from img2table.ocr import TesseractOCR

path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.path.exists(path_to_tesseract):
    pytesseract.pytesseract.tesseract_cmd=path_to_tesseract
    tess_dir=os.path.dirname(path_to_tesseract)
    os.environ["PATH"]+=os.pathsep+tess_dir
else:
    print("Nie znaleziono pliku tesseract.exe w podanej ścieżce!")
def jpg_to_table(file_path):
    print(f"Otwieranie pliku SKANU: {file_path} ...")
    if not os.path.exists(file_path):
        print(f"Błąd: Plik {file_path} nie istnieje.")
        return [],0,0
    try:
        ocr = TesseractOCR(n_threads=1, lang="pol")
        ext = os.path.splitext(file_path)[1].lower()
        doc = None
        if ext=='.pdf':
            doc=Img2TablePDF(src=file_path)
        elif ext in ['.jpg','.jpeg','.png','.bmp']:
            doc=Img2TableImage(src=file_path)
        else:
            print("Nieobsługiwany format pliku.")
            return [],0,0
        print("Trwa detekcja tabel")
        extracted_tables_dict=doc.extract_tables(ocr=ocr,
                                                   implicit_rows=False,
                                                   borderless_tables=False,
                                                   min_confidence=50)
        first_table = None

        for page_idx in sorted(extracted_tables_dict.keys()):
            tables_on_page=extracted_tables_dict[page_idx]
            if tables_on_page:
                first_table = tables_on_page[0]
                break

        if first_table is None:
            print("Nie znaleziono żadnej tabeli w skanie.")
            return [],0,0
        parsed_data=[]
        df=first_table.df
        clean_df=df.fillna('')
        parsed_data=clean_df.values.tolist()
        filtered_data=[]
        for row in parsed_data:
            cleaned_row = [str(cell).strip() for cell in row]
            if any(cleaned_row):
                filtered_data.append(cleaned_row)
        if not filtered_data:
            return [],0,0
        columns_no=len(filtered_data[0])
        rows_no=len(filtered_data)
        print(f"Znaleziono {rows_no} wierszy w tabeli ze skanu.")
        return [filtered_data],columns_no,rows_no
    except Exception as e:
        print(f"Błąd podczas przetwarzania skanu: {e}")
        return [], 0, 0
