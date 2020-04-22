from .settings import *
from django_selenium_test import make_chrome_driver, make_firefox_driver

# we're no debugging, but we're in testing mode
DEBUG = False
IN_TEST_MODE = True

headless = os.environ.get("SELENIUM_HEADLESS", "1") == "1"

SELENIUM_WEBDRIVERS = {
    'default': make_chrome_driver([], {}, headless=headless),
    'firefox': make_firefox_driver([], {}, headless=headless),
}