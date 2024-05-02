#!/usr/bin/env python3
"""
script for task 0
"""
from typing import Tuple
import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    return a tuple of size two containing a
    start index and an end index
    """
    starting = (page - 1) * page_size
    ending = starting + page_size
    return starting, ending


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        returns page according to dataset
        """
        assert type(page) == int and type(page_size) == int
        assert page > 0
        assert page_size > 0
        starting, ending = index_range(page, page_size)
        data = []
        page_data = self.dataset()
        if starting > len(page_data):
            return data
        return page_data[starting:ending]
