from flask import Flask, render_template, request,redirect,url_for,jsonify
from transformers import TFDistilBertForSequenceClassification,DistilBertTokenizer
import numpy as np
import random
import pandas as pd
app = Flask(__name__)
app.static_folder = 'static'

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["GET","POST"])
def analyze():
    def clean_text(text):
        text = text.lower() # lowercase text
        return text
    
    def get_emotions(text):
        model = TFDistilBertForSequenceClassification.from_pretrained('bertsaved')
        tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        new_text = clean_text(text)
        seq = tokenizer.encode(new_text,truncation=True, padding=True,return_tensors="tf")
        pred = model.predict(seq)
        label_name = ['sadness','joy','love','anger','fear','surprised']
        pred_labels = int(np.argmax(pred.logits, axis=1))
        return label_name[pred_labels]
    # Analyze the responses and return the identified mood
    # You can write your own logic here to analyze the responses and identify the mood
    # This is just a placeholder function
    
    # Get the user responses from the request body as JSON
    user_response = request.get_json()
    print(user_response)
    # Process the user responses as needed, e.g., save to a database
    emotion = get_emotions(user_response)

    # Return a success response as dictionary
    response_data = {'mood': emotion}
    return jsonify(response_data), 200
    



@app.route('/mood_identified/<mood>',methods=["GET"])
def mood_identified(mood):
    global user_responses
    # Analyze the responses to identify mood and pass it to the mood_identified page
    # You can write your own logic here to analyze the responses and identify the mood

    if mood == 'sadness':
        song_set = pd.read_csv("./songdata/sad_songs.csv",index_col=0)
        songs_selected = song_set.sample(n=4)
        song_titles = []
        song_artists = []
        song_urls = []
        for i in range(4):
            song_titles.append(songs_selected.iloc[i].at["name"])
            song_artists.append(songs_selected.iloc[i].at["artist"])
            song_urls.append(songs_selected.iloc[i].at["url"])
    
    if mood == 'joy':
        song_set = pd.read_csv("./songdata/cheerful_songs.csv",index_col=0)
        songs_selected = song_set.sample(n=4)
        song_titles = []
        song_artists = []
        song_urls = []
        for i in range(4):
            song_titles.append(songs_selected.iloc[i].at["name"])
            song_artists.append(songs_selected.iloc[i].at["artist"])
            song_urls.append(songs_selected.iloc[i].at["url"])
    
    if mood == 'love':
        song_set = pd.read_csv("./songdata/excited_songs.csv",index_col=0)
        songs_selected = song_set.sample(n=4)
        song_titles = []
        song_artists = []
        song_urls = []
        for i in range(4):
            song_titles.append(songs_selected.iloc[i].at["name"])
            song_artists.append(songs_selected.iloc[i].at["artist"])
            song_urls.append(songs_selected.iloc[i].at["url"])
    
    if mood == 'anger':
        song_set = pd.read_csv("./songdata/tensed_songs.csv",index_col=0)
        songs_selected = song_set.sample(n=4)
        song_titles = []
        song_artists = []
        song_urls = []
        for i in range(4):
            song_titles.append(songs_selected.iloc[i].at["name"])
            song_artists.append(songs_selected.iloc[i].at["artist"])
            song_urls.append(songs_selected.iloc[i].at["url"])
        
    if mood == 'fear':
        song_set = pd.read_csv("./songdata/relaxed_songs.csv",index_col=0)
        songs_selected = song_set.sample(n=4)
        song_titles = []
        song_artists = []
        song_urls = []
        for i in range(4):
            song_titles.append(songs_selected.iloc[i].at["name"])
            song_artists.append(songs_selected.iloc[i].at["artist"])
            song_urls.append(songs_selected.iloc[i].at["url"])
    
    if mood == 'surprised':
        song_set = pd.read_csv("./songdata/cheerful_songs.csv",index_col=0)
        songs_selected = song_set.sample(n=4)
        song_titles = []
        song_artists = []
        song_urls = []
        for i in range(4):
            song_titles.append(songs_selected.iloc[i].at["name"])
            song_artists.append(songs_selected.iloc[i].at["artist"])
            song_urls.append(songs_selected.iloc[i].at["url"])
    
    return render_template('mood_identified.html', mood=mood,song_title_1=song_titles[0],song_artist_1 = song_artists[0],song_spotify_link_1=song_urls[0],song_title_2=song_titles[1],song_artist_2 = song_artists[1],song_spotify_link_2=song_urls[1],song_title_3=song_titles[2],song_artist_3 = song_artists[2],song_spotify_link_3=song_urls[2],song_title_4=song_titles[3],song_artist_4 = song_artists[3],song_spotify_link_4=song_urls[3])


    
    

if __name__ == "__main__":
    app.run() 

    