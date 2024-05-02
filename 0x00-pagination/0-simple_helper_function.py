#!/usr/bin/env python3
"""
script for task 0
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    return a tuple of size two containing a
    start index and an end index
    """
    starting = (page - 1) * page_size
    ending = starting + page_size
    return starting, ending
