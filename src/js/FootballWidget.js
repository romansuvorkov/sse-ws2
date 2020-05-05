export default class FootballWidget {
  constructor(url) {
    this.url = url;
    this.newMessage = null;
  }

  init() {
    const widget = document.createElement('div');
    widget.classList.add('widget');
    widget.innerHTML = `
        <div class="messages_container">
        </div>
      `;
    document.body.appendChild(widget);
    this.widgetField = document.querySelector('.messages_container');
    this.addEventListeners();
  }

  recieveMessage(data) {
    const {
      type, message, date,
    } = JSON.parse(data);
    this.newMessage = document.createElement('div');
    this.newMessage.classList.add('message_item_container');
    const messageDate = new Date(date);
    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();
    const hour = messageDate.getHours();
    const minute = messageDate.getMinutes();
    const second = messageDate.getSeconds();
    this.newMessage.innerHTML = `
      <span class="${type} img"></span>
      <div class="message_item">
      <span class="date">${`${hour}:${minute}:${second} ${day}.${month}.${year}`}</span>
      <span class="message_text">${message}</span>
      </div>
      `;
    this.widgetField.appendChild(this.newMessage);
    this.widgetField.scrollTo(0, this.newMessage.offsetTop);
  }

  addEventListeners() {
    const eventSource = new EventSource(this.url);

    eventSource.addEventListener('gameReport', (event) => {
      this.recieveMessage(event.data);
    });
  }
}
