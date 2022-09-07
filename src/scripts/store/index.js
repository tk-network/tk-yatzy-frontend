import { createStore } from "vuex";
// import { useCookies } from "vue3-cookies";

// const { cookies } = useCookies();

const store = createStore({
    state() {
        return {
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
    }
})

export default store;