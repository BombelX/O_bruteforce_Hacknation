import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
def url_to_table(url):
    print(f"Uruchamiam przeglądarkę dla: {url}")
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--log-level=3")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    try:
        driver.get(url)
        time.sleep(3)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        table = soup.find('table')

        if not table:
            print("Nie znaleziono znacznika <table> w wyrenderowanym kodzie.")
            return [], 0, 0

        parsed_data=[]
        rows=table.find_all('tr')
        print(f"Znaleziono ",len(rows)," wierszy w tabeli.")

        for row in rows:
            cols=row.find_all(['td','th'])
            cols = [ele.get_text(separator=" ", strip=True) for ele in cols]

            if cols:
                parsed_data.append(cols)

        if not parsed_data:
            return [], 0, 0

        columns_no=len(parsed_data[0])
        rows_no=len(parsed_data)

        return [parsed_data], columns_no, rows_no
    except Exception as e:
        print(f"Błąd Selenium: {e}")
        return [], 0, 0
    finally:
        driver.quit()