#!/usr/bin/python3
"""
script for 100-main
"""
from base_caching import BaseCaching
from collections import OrderedDict, defaultdict


class LFUCache(BaseCaching):
    """
    class that inherits from base
    """

    def __init__(self):
        """
        initializer for class
        """
        super().__init__()
        self.cache_data = OrderedDict()
        self.frequency = defaultdict(int)
        self.lfu_order = OrderedDict()

    def put(self, key, item):
        """
        assigns a new value
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_item = min(self.frequency, key=self.frequency.get)
                self.cache_data.pop(lfu_item)
                self.frequency.pop(lfu_item)
                self.lfu_order.pop(lfu_item)
                print("DISCARD:", lfu_item)
            self.cache_data[key] = item
            self.frequency[key] += 1
            self.lfu_order[key] = self.frequency[key]

    def get(self, key):
        """
        gets a value from a key
        """
        if key is None or key not in self.cache_data:
            return None
        else:
            item = self.cache_data[key]
            self.frequency[key] += 1
            self.lfu_order[key] = self.frequency[key]
            return item
