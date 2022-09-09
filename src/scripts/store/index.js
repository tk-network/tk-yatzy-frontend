import { createStore } from "vuex";
// import { useCookies } from "vue3-cookies";

// const { cookies } = useCookies();

const store = createStore({
    state() {
        return {
            ws: WebSocket,
            user: {},
            data: {
                setup: {},
                room: {},
                cube: {},
            }
        }
    },
    mutations: {
        updateUser(state, params) {
            return state.user[params.key] = params.value;
        },
        getData(state, params) {
            state.data[params.action] = params.data;
        }
    },
    actions: {
        async connect({ state }) {
            state.ws = await new Promise((resolve) => {
                const server = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL)
                server.onopen = () =>  {
                    resolve(server);
                };
            });
        },
        up({ state }, data) {
            state.ws.send(JSON.stringify(data));
        },
        disconnect({ state }) {
            state.ws.close();
        }
    }
})

export default store;