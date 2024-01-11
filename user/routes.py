from flask import Flask
from app import app,db_mongo
from user.models import User

@app.route('/user/signup',methods=['POST'])
def signup():
    return User().signup()     #a function in User class


@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login',methods=['POST'])
def login():
    return User().login()  
