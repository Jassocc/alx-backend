#!/usr/bin/python3
"""
script for task 1
"""
from base_caching import BaseCaching
from collections import OrderedDict


class FIFOCache(BaseCaching):
    """
    inherits from base caching class
    """

    def __init__(self):
        """
        initializer for the class
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        assign to the dictionary value to a key
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key, _ = self.cache_data.popitem(last=False)
                print("DISCARD:", discarded_key)
            self.cache_data[key] = item

    def get(self, key):
        """
        gets the valued keys
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
