import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URL = "https://map.naver.com/v5/"

options = Options()
# options.add_argument("headless")

# ===== 해당 펫 플레이스 찾기 =====
def find_place(driver, name):
    # 스크롤 내려 1페이지 모든 li 요소 찾기
    li_cnt = 0
    body = driver.find_element(By.CSS_SELECTOR, "body")
    body.click()
    while True:
        body.send_keys(Keys.END)
        time.sleep(0.1)
        if li_cnt == len(driver.find_elements(By.TAG_NAME, "li")):
            break
        li_cnt = len(driver.find_elements(By.TAG_NAME, "li"))

    li_list = driver.find_elements(By.TAG_NAME, "li")

    # 상호명 비교
    for i in range(li_cnt):
        if name in li_list[i].find_element(By.CSS_SELECTOR, "span.place_bluelink._3Apve").text:
            return li_list[i]
    return []


def get_rating(address, name):
    driver = webdriver.Chrome("chromedriver", options=options)
    driver.implicitly_wait(10)
    driver.get(URL)

    # 펫 플레이스 주소 검색
    input_box = driver.find_element(By.CSS_SELECTOR, "input.input_search")
    input_box.send_keys(address + " " + name, Keys.ENTER)
    time.sleep(1)

    # frame 변경
    try:
        # 검색 결과 목록 frame 변경
        frame = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.ID, "searchIframe")))
        driver.switch_to.frame(frame)
        target_place = find_place(driver, name)

        if not target_place:
            driver.quit()
            return 0.0

        target_place.find_element(By.CSS_SELECTOR, "a._3LMxZ").click()

    except:
        pass

    # 해당 플레이스 상세 정보 frame 변경
    driver.switch_to.default_content()
    frame = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.ID, "entryIframe")))
    driver.switch_to.frame(frame)


    # 평점
    driver.find_element(By.PARTIAL_LINK_TEXT, "리뷰").click()
    try:
        rating = driver.find_element(By.CSS_SELECTOR, "span.ANYgl._5hGsS").text
    except:
        rating = 0.0

    return rating
