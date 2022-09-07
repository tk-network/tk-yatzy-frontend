import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./scripts/store"
import Vue3Cookies from "vue3-cookies";

const app = createApp(App);

app.use(router);
app.use(store)

// PrimeVue start
// https://www.primefaces.org/primevue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';

app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog';
import Menu from 'primevue/menu';
import Sidebar from 'primevue/sidebar';

app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Card', Card);
app.component('Toolbar', Toolbar);
app.component('Toast', Toast);
app.component('DynamicDialog', DynamicDialog);
app.component('Menu', Menu);
app.component('Sidebar', Sidebar);
// PrimeVue end

app.use(Vue3Cookies, {
    expireTime: "80d",
    secure: true,
    sameSite: "lax",
})

app.config.globalProperties.$cubeSpinCount = 6;
app.config.globalProperties.$cubeSpinTime = 300;
app.config.globalProperties.$ws = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL);
app.mount("#app");
/*app.config.globalProperties.$ws.addEventListener("open", () => {
    app.config.globalProperties.$ws["up"] = (data) => {
        app.config.globalProperties.$ws.send(JSON.stringify(data))
    }
    app.mount("#app");
});*/