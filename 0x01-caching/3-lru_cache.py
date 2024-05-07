#!/usr/bin/python3
"""
Script for task 3
"""
from base_caching import BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """
    class inheriting from base
    """

    def __init__(self):
        """
        initializer for class
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        assigns a value to a key
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key, _ = self.cache_data.popitem(last=False)
                print("DISCARD:", discarded_key)
            self.cache_data[key] = item
            self.cache_data.move_to_end(key)

    def get(self, key):
        """
        gets a key to a value
        """
        if key is None or key not in self.cache_data:
            return None
        else:
            item = self.cache_data.pop(key)
            self.cache_data[key] = item
            self.cache_data.move_to_end(key)
            return item
