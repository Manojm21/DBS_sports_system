from flask import Flask,jsonify,request,session,redirect
from passlib.hash import pbkdf2_sha256
import uuid
from app import db_mongo


class User:

    def start_session(self,user):
        del user['password']
        session['logged_in']=True    #the basic pymongo template
        session['user']=user
        return jsonify(user),200

    def signup(self):  #1st code
     
        #this is an user object
        user={
            "_id":uuid.uuid4().hex,
            "name":request.form.get("name"),   #match with "name" attribute in the html page
            "USN":request.form.get("usn"),     #match with "name" attribute in the html page
            "email":request.form.get("email"), #match with "name" attribute in the html page
            "password":request.form.get("password") #match with "name" attribute in the html page
        }

        #also we need to encrypt the password know so...
        user['password']=pbkdf2_sha256.encrypt(user['password'])

#collection is stored here....called users
        if db_mongo.user_login.find_one({"email": user['email']}):
           return jsonify({"error": "credentials are already in use"}),400 #to check if any user there aready

        if db_mongo.user_login.insert_one(user):  #users collection
           return self.start_session(user)
        
        return jsonify({"error":"signup_failed_badly"}),400  #generic error if all failed
    
    def signout(self):
        session.clear()
        return redirect('/user')
    
    def login(self):
        user = db_mongo.user_login.find_one({"email": request.form.get('email')})

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
          return self.start_session(user)  #required
    
        return jsonify({ "error": "Invalid login credentials" }), 401
    

  


