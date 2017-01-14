# -*- coding: utf-8 -*-
import os
import time
import hashlib

from flask import Flask, request, render_template, redirect, url_for
from flask_uploads import UploadSet, configure_uploads, IMAGES,\
    patch_request_class

from generate import Impress


app = Flask(__name__)
app.config['UPLOADED_PHOTOS_DEST'] = os.getcwd() + '/static/photos'

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)
patch_request_class(app)  # set maximum file size, default is 16MB


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    username = hashlib.md5('demo' + str(time.time())).hexdigest()[:7]
    if request.method == 'POST' and 'photo' in request.files:
        for index, img in enumerate(request.files.getlist('photo')):
            filename = username + str(index)
            photos.save(img, name=username + '/' + filename + '.')
        return redirect(url_for('image_wall', username=username))
    return render_template('index.html')


@app.route('/wall/<username>')
def image_wall(username):
    wall = Impress(username)
    wall.create()
    overview = wall.overview()
    images = wall.save()
    print images
    return render_template('wall.html', overview=overview, images=images)

if __name__ == '__main__':
    app.run(debug=True)
