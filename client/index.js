import { createApp, ref, watch, reactive } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js";

const app = createApp({
  setup() {
    const isConnected = ref(false);
    const connect = () => {
      isConnected.value = !isConnected.value 
    }

    let ws = ref(null);

    watch(isConnected, () => {
      if (isConnected.value) {
        ws.value = new WebSocket("ws://localhost:3636");
        ws.value.onopen = () => {
          console.log("open connection");
        };
    
        ws.value.onmessage = (event) => {
          console.log(event);
        };
    
        ws.value.onclose = () => {
          console.log("close connection");
        };
      } else {
        ws.value.close()
        ws.value = null
      }
    })

    const txt = ref("");
    const sendData = () => {
      if (!isConnected.value) {
        alert('目前尚未連線');
        txt.value = "";
        return;
      }
      ws.value.send(txt.value);
      txt.value = "";
    }

    return {
      isConnected,
      connect,
      txt,
      ws,
      sendData
    }
  }
});
app.mount("#app");
