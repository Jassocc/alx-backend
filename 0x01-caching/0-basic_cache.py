#!/usr/bin/python3
"""
script for task 0
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    class that inherits from base caching
    """

    def put(self, key, item):
        """
        assigns avaluie to a key
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        gets the key assigned to a value
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
