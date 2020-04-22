from django_selenium_test import IntegrationTest

class FrontendTest(IntegrationTest):
    find_element_timeout = 10
    fixtures = ['datasets.json']

    def test_show_rows(self):
        """ Tests that rows are shown on the page """

        self.load_live_url("root", selector=".rt-tbody > .rt-tr-group")
        elements = self.selenium.find_elements_by_css_selector('.rt-tbody > .rt-tr-group')
        self.assertEqual(len(elements), 20)