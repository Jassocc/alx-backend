#!/usr/bin/python3
"""
script for task 2
"""
from base_caching import BaseCaching
from collections import OrderedDict


class LIFOCache(BaseCaching):
    """
    class that inherits from base caching
    """

    def __init__(self):
        """
        initializer fir class
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        assigns a value to a key
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key, _ = self.cache_data.popitem(last=True)
                print("DISCARD:", discarded_key)
            self.cache_data[key] = item

    def get(self, key):
        """
        gets a key and its value
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
