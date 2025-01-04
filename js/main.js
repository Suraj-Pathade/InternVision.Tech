(function ($) {
    "use strict";
    
    // Update the scroll indicator on scroll
window.onscroll = function () {
    updateScrollIndicator();
  };
  
  function updateScrollIndicator() {
    // Calculate the scroll percentage
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
  
    // Set the width of the scroll indicator
    document.getElementById("scrollIndicator").style.width = scrollPercent + "%";
  }
  

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(jQuery);

const chatbot = document.getElementById('chatbot');
const openChatbotButton = document.getElementById('open-chatbot');
const closeChatbotButton = document.getElementById('close-chatbot');
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const messagesContainer = document.getElementById('messages');

// Open Chatbot
openChatbotButton.addEventListener('click', () => {
  chatbot.style.display = 'flex';
  openChatbotButton.style.display = 'none';
});

// Close Chatbot
closeChatbotButton.addEventListener('click', () => {
  chatbot.style.display = 'none';
  openChatbotButton.style.display = 'block';
});

// Send Message
sendButton.addEventListener('click', sendMessage);

// Send Message on "Enter" Key Press
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Function to Send Message
function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user-message');
    userInput.value = '';
    setTimeout(() => {
      const botReply = getBotReply(userMessage);
      addMessage(botReply, 'bot-message');
    }, 500);
  }
}

// Add Message to Chat and Scroll Automatically
function addMessage(text, className) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${className}`;
  messageElement.textContent = text;
  messagesContainer.appendChild(messageElement);

  // Scroll to the bottom of the messages container
  scrollToBottom();
}

// Scroll to the Bottom of the Messages Container
function scrollToBottom() {
  messagesContainer.scrollTo({
    top: messagesContainer.scrollHeight,
    behavior: 'smooth', // Smooth scrolling effect
  });
}

// Simple Bot Reply Logic
function getBotReply(userMessage) {
  const normalizedMessage = userMessage.toLowerCase();
  if (
    ['hello', 'hi', 'hey', 'howdy', 'greetings', 'yo', 'whatsup', 'sup', 'how are you', 'how are you doing'].some((greeting) =>
      normalizedMessage.includes(greeting)
    )
  ) {
    return 'Hi there! How can I help you today?';
  } else if (normalizedMessage.includes('help')) {
    return 'Sure! Let me know what you need assistance with.';
  } else {
    return "I'm sorry, I don't understand that. Could you rephrase?";
  }
}
