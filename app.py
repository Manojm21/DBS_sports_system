from flask import Flask,render_template,request,redirect,session
from functools import wraps
import pymongo
# from flask_mysqldb import MySQL



app=Flask(__name__)
app.secret_key=b'=\xde\xe0#\xe3\xb6\xe8\x1d\xfa\ts\x81`\xf7.y'

#database
client=pymongo.MongoClient('localhost',27017)
db_mongo=client.DBS_lab



# # eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'your_mysql_username'
# app.config['MYSQL_PASSWORD'] = 'your_mysql_password'
# app.config['MYSQL_DB'] = 'your_mysql_database'
# mysql = MySQL(app)

# #eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee



#decorator  #to check if we wanna let the  user go into the dashboard(ie or else he will enter directly aldos by changing the url)
def login_required(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if "logged_in" in session:
            return f(*args,**kwargs)
        else:
            return redirect('/user')
    return wrap


#all the routes from here
from user import routes

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/user")
def home():
    return render_template("home.html")

@app.route("/ARedu")
def ARedu():
    return render_template("education.html")




@app.route("/dashboard/") #required here #see we used here
@login_required           
def dashboard(): 
    return render_template("dashboard.html")
