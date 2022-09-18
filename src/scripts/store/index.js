import { createStore } from "vuex";
import { useCookies, globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

const { cookies } = useCookies();

const store = createStore({
    state() {
        return {
            ws: WebSocket,
            user: {},
            data: {
                setup: {},
                room: {},
                cube: {},
                modal: {},
                message: {},
            }
        }
    },
    mutations: {
        updateUser(state, params) {
            if(params?.key == "id") cookies.set("user", params.value);
            return state.user[params.key] = params.value;
        },
        getData(state, params) {
            state.data[params.action] = params.data;
        }
    },
    actions: {
        async connect({ dispatch, state }) {
            state.ws = await new Promise((resolve) => {
                const user = cookies.get("user") || state.data.setup.id || undefined;
                const server = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL, user)

                server.onopen = () =>  {
                    resolve(server);
                };

                server.onmessage = (event) => {
                    dispatch("onMessage", event)
                };

                server.onclose = () => {
                    dispatch("reconnect");
                }
            });
        },
        up({ state }, data) {
            state.ws.send(JSON.stringify(data));
        },
        onMessage({commit}, event) {
            let data = JSON.parse(event.data);
            commit("getData", data);
        },
        reconnect({ dispatch }) {
            setTimeout(() => {
                dispatch("connect")
            }, 2000)
        },
        disconnect({ state }) {
            state.ws.close();
        },
    }
})

export default store;