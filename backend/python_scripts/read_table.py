from datetime import datetime
import read_jpg
import read_pdf
import re
import json
from urllib.parse import urlparse
import os
import read_url
import read_docx
import read_jpg
import api
wojewodztwo = 'Małopolskie'
powiat = 'wielicki'
input = "3987072.pdf"

categories = {
    "Dokumenty": [
        "dowód", "dowód osobisty", "paszport", "legitymacja", "prawo jazdy",
        "karta", "karta miejska", "karta płatnicza", "karta bankomatowa", "karta pobytu",
        "dokument", "dokumenty", "dyplom", "świadectwo", "indeks", "koperta",
        "teczka", "akt", "akt notarialny", "ubezpieczenie", "polisa",
        "recepta", "skierowanie", "bilet", "karnet", "identyfikator",
        "przepustka", "wizytownik", "dowód rejestracyjny", "książeczka"
    ],
    "Elektronika": [
        "telefon", "smartfon", "komórka", "iphone", "samsung", "xiaomi", "huawei",
        "laptop", "notebook", "macbook", "tablet", "ipad", "kindle",
        "słuchawki", "airpods", "jbl", "głośnik", "kolumna",
        "powerbank", "ładowarka", "kabel", "przewód usb", "adapter",
        "zegarek", "smartwatch", "garmin", "miband", "apple watch",
        "sprzęt", "czytnik", "aparat", "lustrzanka", "obiektyw", "kamera", "gopro",
        "dron", "pad", "konsola", "myszka", "klawiatura", "dysk", "pendrive",
        "e-papieros", "vape", "iqos", "glo",
        "silnik", "rozruchowe", "wkrętak", "pilot", "sterownik"
    ],
    "Odzież i akcesoria osobiste": [
        "kurtka", "płaszcz", "marynarka", "bluza", "sweter", "polar", "kamizelka",
        "czapka", "szalik", "komin", "rękawice", "rękawiczki",
        "torba", "plecak", "nerka", "saszetka", "walizka", "torebka", "reklamówka", "worek",
        "portfel", "portmonetka", "bilonówka", "etui",
        "buty", "obuwie", "trampki", "adidasy", "szpilki", "sandały", "klapki", "kozaki",
        "okulary", "okulary przeciwsłoneczne", "oprawki",
        "ubrania", "spodnie", "koszula", "sukienka",
        "klucze", "klucz", "kluczyki", "brelok", "smycz",  # Dodane klucze tutaj
        "parasol", "pasek", "kosmetyczka", "szminka", "perfumy"
    ],
    "Biżuteria i zegarki": [
        "pierścionek", "sygnet", "obrączka",
        "naszyjnik", "łańcuszek", "wisiorek", "zawieszka", "korale", "medalik",
        "zegarek", "zegarek mechaniczny",
        "kolczyki", "klipsy", "sztyfty",
        "bransoletka", "broszka", "spinki", "spinki do mankietów",
        "złoto", "srebro", "platyna", "bursztyn", "biżuteria"
    ],
    "Sport i rekreacja": [
        "rower", "góral", "szosówka", "bicykl",
        "hulajnoga", "hulajnoga elektryczna",
        "piłka", "futbolówka", "koszykówka",
        "rakieta", "kije", "kijki nordic", "wędka", "podbierak", "kołowrotek",
        "kask", "ochraniacze", "mata", "karimata",
        "narty", "sanki", "łyżwy", "deska", "snowboard",
        "rolki", "wrotki", "deskorolka", "fiszka",
        "plecak sportowy", "torba sportowa", "bidon", "termos", "namiot", "śpiwór"
    ],
    "Narzędzia": [
        "siekiera", "toporek",
        "wkrętak", "śrubokręt",
        "pompka", "kompresor",
        "przewody", "kable", "przedłużacz",
        "narzędzia", "skrzynka", "walizka narzędziowa",
        "młotek", "klucz", "klucz płaski", "francuz", "kombinerki", "szczypce",
        "wiertarka", "wkrętarka", "szlifierka", "piła", "wyrzynarka",
        "miara", "metrówka", "poziomica", "latarka",
        "gaśnica", "trójkąt", "lewarek", "podnośnik"
    ]
}

# info_to_json=['Powiat','Województwo','Kategoria','Data znalezienia','Data wstawienia','Miejsce znalezienia','Opis przedmiotu']
info_to_json = ['voivodeship', 'region', 'category_id', 'subcategory_id',
                'where_found', 'found_date', 'register_date', 'description', 'user_id']
idx_place = -1
idx_description = -1


def clean_ocr_text(text):
    text = re.sub(r'[=—_\-]', ' ', text)
    text = re.sub(r'[^\w\s.,ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def detect_file_type_by_extension(url_or_path):
    parsed = urlparse(url_or_path)
    path = parsed.path
    _, ext = os.path.splitext(path)
    ext = ext.lower()
    if ext == '.pdf':
        return 'pdf'
    elif ext in ['.doc', '.docx']:
        return 'docx'
    elif ext in ['.html', '.htm', '.php', '.asp', '.aspx']:
        return 'html'
    elif ext == '' and parsed.netloc:
        return 'html'
    return 'unknown'


def find_category(row):
    for text_column in row:
        if not text_column:
            continue
        text_column = text_column.lower()
        for category, key in categories.items():
            for item in key:
                if item.lower() in text_column:
                    return clean_ocr_text(category)
    return 'Inne'


def find_date(row):
    pattern = r"(?<!\.)\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b"
    date_first = ''
    date_second = ''
    for s in row:
        date = re.findall(pattern, str(s))
        if len(date) > 0:
            if len(date_first) == 0:
                date_first = date[0]
            elif len(date_second) == 0:
                date_second = date[0]
    date_first = date_first.replace('.', '-').replace('/', '-')
    date_second = date_second.replace('.', '-').replace('/', '-')

    if date_first and date_second:
        d1 = datetime.strptime(date_first, "%d-%m-%Y")
        d2 = datetime.strptime(date_second, "%d-%m-%Y")
        if d1 > d2:
            date_first, date_second = date_second, date_first
    elif date_first:
        date_second = None
    elif date_second:
        date_first = date_second
        date_second = None
    else:
        date_first = None
        date_second = None
    return date_first, date_second


def find_place_idx(row):
    idx = 0
    global idx_place
    for s in row:
        if 'miejsce' in s.lower():
            idx_place = idx
            return
        idx += 1


def find_place(row):
    global idx_place
    return clean_ocr_text(row[idx_place]) if idx_place != -1 else None


def find_description_idx(row):
    global idx_description
    if idx_description == -1:
        idx = 0
        for s in row:
            str = s.lower()
            if 'opis' in str:
                idx_description = idx
                return
            idx += 1


def find_description(row):
    str = ''
    if idx_description == -1:
        if len(row) > 0:
            str += row[0]
        for i in range(1, len(row)):
            str = str+', ' + row[i]
    else:
        str = row[idx_description]
    return clean_ocr_text(str)


def row_to_json(row):
    category = find_category(row)
    date_found, date_of_issue = find_date(row)
    found_place = find_place(row)
    description = find_description(row)

    # return powiat,wojewodztwo,category,date_found,date_of_issue,found_place,description
    return powiat, wojewodztwo, category, None, found_place, date_found, date_of_issue, description, None


def save_to_json(data):
    json_list = [dict(zip(info_to_json, row)) for row in data]
    with open("znalezione_przedmioty.json", "w", encoding="utf-8") as f:
        json.dump(json_list, f, ensure_ascii=False, indent=4)


match detect_file_type_by_extension(input):
    case 'pdf':
        result, columns_no, rows_no = read_pdf.pdf_to_table(input)
    case 'html':
        result, columns_no, rows_no = read_url.url_to_table(input)
    case 'docx':
        result, columns_no, rows_no = read_docx.docx_to_table(input)
    case 'jpg', 'jpeg', 'png', 'bmp':
        result, columns_no, rows_no = read_jpg.jpg_to_table(input)

find_description_idx(result[0][0])
res = []
find_place_idx(result[0][0])

if idx_description == -1:
    idx = 0
else:
    idx = 1
for i in range(len(result)):
    for j in range(idx, len(result[0])):
        x = row_to_json(result[i][j])
        b = False
        for a in range(2, len(x)-1):
            if x[a] != None:
                b = True
                break
        if b:
            res.append(x)
save_to_json(res)
api.api_f(res)
