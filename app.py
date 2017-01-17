# -*- coding: utf-8 -*-
import os
import time
import hashlib

"""
    Author: Grey Li
    Blog: http://greyli.com
    Email: withlihui@gmail.com
    Git repository: https://github.com/greyli/image-wall
    This work based on impress.js which can be found at https://github.com/impress/impress.js
"""

from flask import Flask, request, render_template, redirect, url_for
from flask_uploads import UploadSet, configure_uploads, IMAGES,\
    patch_request_class

from generator import ImageWall


app = Flask(__name__)
app.config['UPLOADED_PHOTOS_DEST'] = os.getcwd() + '/static/photos'

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)
patch_request_class(app)  # set maximum file size, default is 16MB


@app.route('/', methods=['GET', 'POST'])
def index():
    username = hashlib.md5('demo' + str(time.time())).hexdigest()[:7]
    if request.method == 'POST' and 'photo' in request.files:
        amount = len(request.files.getlist('photo'))
        if amount in range(10, 101):
            for num, img in enumerate(request.files.getlist('photo')):
                filename = username + str(num)
                photos.save(img, name=username + '/' + filename + '.')
            return redirect(url_for('image_wall', username=username))
    return render_template('index.html')


@app.route('/image-wall/<username>')
def image_wall(username):
    wall = ImageWall(username)
    images = wall.create()
    overview = wall.overview()
    return render_template('wall.html', overview=overview, images=images)

if __name__ == '__main__':
    app.run(debug=True)
