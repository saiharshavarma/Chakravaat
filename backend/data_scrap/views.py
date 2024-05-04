import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
# from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select
import numpy as np
import cv2
import urllib

# def fetchRealTimeDatas(): From Tropic (6hr update)
#     chrome_options = Options()
#     chrome_options.add_argument("--headless=new")
#     chrome_options.add_argument("--headless")
#     driver = webdriver.Chrome(options=chrome_options)
#     driver.get("https://www.google.com/")

#     driver.get('https://mausam.imd.gov.in/imd_latest/contents/satellite.php')

#     time.sleep(5)

#     image_element = driver.find_element(By.XPATH, '//*[@id="images"]/img')
#     src = image_element.get_attribute('src')
#     try:
#         print("Processing Image Success")
#         urllib.request.urlretrieve(src, 'static/real-time-scrap/processing.png')
#     except Exception as e:
#         print("Done")

#     driver.get("https://tropic.ssec.wisc.edu/real-time/imagemain.php?&basin=indian&prod=irbbm&sat=m5")

#     time.sleep(5)

#     image_element = driver.find_element(By.XPATH, '/html/body/table/tbody/tr/td/center/p/img')
#     src = image_element.get_attribute('src')
#     try:
#         print("Original Image Success")
#         urllib.request.urlretrieve(src, 'static/real-time-scrap/original.png')
#     except Exception as e:
#         print("Done")    

#     driver.get("https://tropic.ssec.wisc.edu/real-time/imagemain.php?&basin=indian&prod=irn&sat=m5")

#     time.sleep(5)

#     image_element = driver.find_element(By.XPATH, '/html/body/table/tbody/tr/td/center/p/img')
#     src = image_element.get_attribute('src')
#     try:
#         print("IR Image Success")
#         urllib.request.urlretrieve(src, 'static/real-time-scrap/ir.png')
#     except Exception as e:
#         print("Done")
    
#     driver.quit()
#     print("Sleeping")


# def fetchRealTimeData(): From MOSDAC
#     chrome_options = Options()
#     chrome_options.add_argument("--headless=new")
#     chrome_options.add_argument("--headless")
#     driver = webdriver.Chrome()
#     driver.get("https://www.google.com/")

#     driver.get('https://mausam.imd.gov.in/imd_latest/contents/satellite.php')

#     time.sleep(5)

#     image_element = driver.find_element(By.XPATH, '//*[@id="images"]/img')
#     src = image_element.get_attribute('src')
#     try:
#         print("Processing Image Success")
#         urllib.request.urlretrieve(src, 'static/real-time-scrap/processing.png')
#     except Exception as e:
#         print("Done")

#     driver.get('https://mosdac.gov.in/live/index_one.php?url_name=india')

#     time.sleep(5)

#     button = driver.find_element(By.XPATH, '//*[@id="bottom_menu_act_btn3"]')
#     button.click()

#     time.sleep(5)

#     dropdown_element = driver.find_element(By.XPATH, '//*[@id="canvas-layout"]/div[1]/div[2]/select')

#     select = Select(dropdown_element)
#     select.select_by_value("string:boxfill/nhc")

#     time.sleep(5)

#     full_screen = driver.find_element(By.XPATH, '//*[@id="map"]/div/div[2]/div[7]/button')
#     full_screen.click()

#     time.sleep(5)

#     driver.save_screenshot('static/real-time-scrap/ir.png')
#     print("IR Image Success")

#     time.sleep(5)

#     full_screen = driver.find_element(By.XPATH, '//*[@id="map"]/div/div[2]/div[7]/button')
#     full_screen.click()

#     select.select_by_value("string:boxfill/greyscale")

#     time.sleep(5)

#     button = driver.find_element(By.XPATH, '//*[@id="bottom_menu_act_btn3"]')
#     button.click()

#     button = driver.find_element(By.XPATH, '//*[@id="bottom_menu_act_btn1"]')
#     button.click()

#     button = driver.find_element(By.XPATH, '//*[@id="bottom_menu_btn1"]/table/tbody/tr[1]/td[1]/button')
#     button.click()

#     time.sleep(5)

#     full_screen = driver.find_element(By.XPATH, '//*[@id="map"]/div/div[2]/div[7]/button')
#     full_screen.click()

#     time.sleep(5)

#     driver.save_screenshot('static/real-time-scrap/original.png')
#     print("Original Image Success")

#     time.sleep(5)

#     driver.quit()
#     time.sleep(5)

def fetchRealTimeData():
    chrome_options = Options()
    #chrome_options.add_argument("--headless=new")
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-position=-32000,-32000")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("https://www.google.com/")

    driver.get('https://mausam.imd.gov.in/imd_latest/contents/satellite.php')

    time.sleep(2)

    image_element = driver.find_element(By.XPATH, '//*[@id="images"]/img')
    src = image_element.get_attribute('src')
    try:
        print("Processing Image Success")
        urllib.request.urlretrieve(src, 'static/real-time-scrap/processing.png')
    except Exception as e:
        print("Done")

    driver.get('https://mausam.imd.gov.in/imd_latest/contents/rapidscan.php')

    time.sleep(5)
    button = driver.find_element(By.XPATH, '//*[@id="left_menu"]/ul/li[1]')
    button.click()

    time.sleep(5)

    hyperlink = driver.find_element(By.XPATH, '//*[@id="a7"]')
    hyperlink.click()

    time.sleep(5)

    image_element = driver.find_element(By.XPATH, '//*[@id="images"]/img')
    src = image_element.get_attribute('src')
    try:
        print("IR Image Success")
        urllib.request.urlretrieve(src, 'static/real-time-scrap/ir.jpg')
    except Exception as e:
        print("Done")

    driver.quit()