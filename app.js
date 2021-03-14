let img = document.querySelector('#track-image'),
  volume_show = document.querySelector('#volume-show'),
  volume = document.querySelector('#volume'),
  present = document.querySelector('#present'),
  total = document.querySelector('#total'),
  title = document.querySelector('#title'),
  artist = document.querySelector('#artist'),
  pre = document.querySelector('#pre'),
  play = document.querySelector('#play'),
  next = document.querySelector('#next'),
  slider = document.querySelector('#duration_slider'),
  autoplaySwitch = document.querySelector('#auto');

let play_music = false;
let autoplay = 0;
let index_no = 0;
let track = document.createElement('audio');

const songdeatails = [
  {
    path: "musics/1.mp3",
    img: "img/item1.jpg",
    title: "song 1",
    artist: "artist 1"
  },
  {
    path: "musics/2.mp3",
    img: "img/item2.jpg",
    title: "song 2",
    artist: "artist 2"
  },
  {
    path: "musics/3.mp3",
    img: "img/item3.jpg",
    title: "song 3",
    artist: "artist 3"
  },
  {
    path: "musics/4.mp3",
    img: "img/item4.jpg",
    title: "song 4",
    artist: "artist 4"
  },
  {
    path: "musics/5.mp3",
    img: "img/item5.jpg",
    title: "song 5",
    artist: "artist 5"
  }
]

function setAudioTerms(index_no) {
  // clearInterval(timer);
  reset_slider();
  img.src = songdeatails[index_no].img;
  title.textContent = songdeatails[index_no].title;
  artist.textContent = songdeatails[index_no].artist;
  track.src = songdeatails[index_no].path;

  total.textContent = songdeatails.length;
  present.textContent = index_no + 1;

  timer = setInterval(slider_range, 1000);
}

function reset_slider() {
  slider.value = 0;
}

function justplay() {
  if (play_music == false) {
    playsong();
  } else {
    pausesong();
  }
}

function playsong() {
  track.play();
  play_music = true;
  play.innerHTML = "<i class='fa fa-pause' aria-hidden='true'></i>";
}

function pausesong() {
  track.pause();
  play_music = false;
  play.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
}

function autoplay_switch() {
  if (autoplay == 1) {
    autoplay = 0;
    autoplaySwitch.style.background = "rgba(255,255,255,0.2)";
  } else {
    autoplay = 1;
    autoplaySwitch.style.background = "#FF8A65";
  }
}

function next_song() {
  if (index_no < songdeatails.length) {
    index_no += 1;
  } else {
    index_no = 0;
  }
  setAudioTerms(index_no);
  playsong();
}

function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
  } else {
    index_no = songdeatails.length - 1;
  }
  setAudioTerms(index_no);
  playsong();
}

function volume_change() {
  volume_show.textContent = volume.value;
  track.volume = volume.value / 100;
}

function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

function mute_sound() {
  volume_show.textContent = 0;
  track.volume = 0;
  volume.value = 0;
}

function slider_range() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  if (track.ended) {
    play.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
    if (autoplay == 1) {
      index_no += 1;
      if (index_no == songdeatails.length) {
        index_no = 0;
      }
      setAudioTerms(index_no);
      playsong();
    }
  }
}

setAudioTerms(index_no);