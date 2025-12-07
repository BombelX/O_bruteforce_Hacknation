import pdfplumber
import pandas as pd
import read_jpg

def pdf_to_table(pdf_file):
    rows = []
    output_dp=[]
    columns_no=0
    try:
        with pdfplumber.open(pdf_file) as pdf:
            for i, page in enumerate(pdf.pages):
                tables = page.extract_tables()
                if tables:
                    print(f"  -> Znaleziono {len(tables)} tabel na stronie {i + 1}")
                    for table in tables:
                        for row in table:
                           clean_row = [
                                (cell.replace('\n', ' ') if cell is not None else "")
                                for cell in row
                            ]
                           columns_no=len(clean_row)
                           rows.append(clean_row)
                else:
                    print(f"  -> Brak tabel na stronie {i + 1}")

        if not rows:
            return read_jpg.jpg_to_table(pdf_file)
            print("Nie znaleziono żadnych danych w tabelach")
            return
        output_dp.append(rows)
        return output_dp,columns_no,len(output_dp[0])
    except Exception as e:
        print(f"Wystąpił błąd: {e}")

