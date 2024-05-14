#!/usr/bin/env python3
"""
script for task 0
"""
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def indexing():
    """
    index route and func
    """
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
