import sqlite3
from flask import Flask, render_template, request, redirect

app=Flask(__name__)

con=sqlite3.connect("users.db")
cur=con.cursor()


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("register.html")

@app.route("/game", methods=["GET", "POST"])
def game():
    if request.method == "GET":
        return render_template("game.html", username="guest", highscore=0)
    if request.method == "POST":

