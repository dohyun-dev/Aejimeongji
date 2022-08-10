import time
from datetime import datetime
import json

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ===== 검색 기본 설정 =====
URL = "https://map.naver.com/v5/"
options = Options()
options.add_argument("headless")

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
        for nm in name.split():
            if nm in li_list[i].find_element(By.CSS_SELECTOR, "span.place_bluelink._3Apve").text:
                return li_list[i]
    return []


# ===== 평점 및 방뮨자 리뷰 데이터 크롤링 =====
def get_reviews(address, name):

    driver = webdriver.Chrome("chromedriver", options=options)
    driver.implicitly_wait(1)
    driver.get(URL)

    # 펫 플레이스 검색
    sido = address.split()[0]
    input_box = driver.find_element(By.CSS_SELECTOR, "input.input_search")
    input_box.send_keys(sido + " " + name, Keys.ENTER)
    time.sleep(1)

    # frame 변경
    try:
        # 검색 결과 목록 frame 변경
        frame = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.ID, "searchIframe")))
        driver.switch_to.frame(frame)
        target_place = find_place(driver, name)

        if not target_place:
            driver.quit()
            return []

        target_place.find_element(By.CSS_SELECTOR, "a._3LMxZ").click()

    except:
        pass

    # 해당 플레이스 상세 정보 frame 변경
    driver.switch_to.default_content()
    try:
        frame = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.ID, "entryIframe")))
        driver.switch_to.frame(frame)
    except:
        driver.quit()
        return

    # 방문자 리뷰
    data = []
    driver.find_element(By.PARTIAL_LINK_TEXT, "리뷰").click()
    try:
        reviews = driver.find_elements(By.CSS_SELECTOR, "ul._3F4VF > li")
    except:
        reviews = []

    for i in range(len(reviews)):
        try:
            reviews[i].find_element(By.CSS_SELECTOR, "span._3_09q").click()     # 더보기 클릭
        except:
            pass

        # 작성자
        reviewer = reviews[i].find_element(By.CSS_SELECTOR, "div._1vou-").text
        # 리뷰글
        review = reviews[i].find_element(By.CSS_SELECTOR, "span.WoYOw").text
        # 날짜
        date_tmp = reviews[i].find_element(By.TAG_NAME, "time").text.split(".")
        # 날짜 정제
        if len(date_tmp) == 3:
            date = str(datetime.today().year) + "-" + date_tmp[0].zfill(2) + "-" + date_tmp[1].zfill(2)
        else:
            date = "20" + date_tmp[0] + "-" + date_tmp[1].zfill(2) + "-" + date_tmp[2].zfill(2)
        # 해시 태그 목록
        try:
            reviews[i].find_element(By.CSS_SELECTOR, "div._1aSvN > a").click()
        except:
            pass
        hash_tags = [hash_tag.text for hash_tag in reviews[i].find_elements(By.CSS_SELECTOR, "div._1aSvN > span.utrsf")]

        data.append({
            "reviewer": reviewer,
            "content": review,
            "date": date,
            "hash_tags": hash_tags
        })

    driver.quit()

    json_data = json.dumps(data, indent=4, ensure_ascii=False)
    print(json_data)

    return json_data

get_reviews("서귀포시 남원읍 남원월산로74번길 101-28", "오월의 제주")
