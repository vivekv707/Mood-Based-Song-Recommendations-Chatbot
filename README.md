# Mood-Based-Song-Recommendations-Chatbot
A Chatbot designed to detect your current mood and suggest songs that might match your mood. Music can have a powerful impact on our emotions and can help us to relax, feel energized, or uplift our spirits. By understanding your current mood, I can recommend songs that will resonate with you and hopefully enhance your mood even further. So, please feel free to share how you're feeling, and I'll do my best to suggest some great songs that might just hit the spot!


## Installation

To install the application, you can clone the repository from GitHub:

```
git clone https://github.com/vivekv707/Mood-Based-Song-Recommendations-Chatbot.git
```

## Dataset

The dataset used for song recommendations is sourced from the Spotify Web API using the Spotipy library. It includes metadata about songs such as name, artist, album, release year, genre, mood, lyrics, tempo, key, and more. The audio features for each song, such as acousticness, danceability, energy, and instrumentalness, are obtained using the Spotify audio features API.

## Machine Learning Model

The machine learning model used to identify emotions is a rule-based system that uses natural language processing techniques to identify keywords and phrases associated with each emotion. The model does not require training on a large dataset, as it uses a predefined set of rules to identify emotions based on user responses.

## Future Work

Future work on the application could include:
- Integrating more advanced natural language processing techniques, such as sentiment analysis and entity recognition, to improve the accuracy of emotion detection.
- Adding a user profile system to save user preferences and improve song recommendations over time.
- Incorporating user feedback to improve the accuracy of song recommendations and emotion identification.

## Contributors

- Vivek Vishwakarma 
- Ali Shaikh
- Umesh Raval

## License

This project is licensed under the MIT License 
