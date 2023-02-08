import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  if (!JSON.parse(localStorage.getItem("s10g4"))) return [];
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      writeFavsToLocalStorage([...state.favs, action.payload])
      let control = state.favs.every((f) => f.message !== action.payload.message);
      return {
        ...state,
        favs: control ? [...state.favs, action.payload] : [...state.favs]
      }

    case FAV_REMOVE:
      const newFavs = state.favs.filter((item) => item.id !== action.payload);
      return {
        ...state,
        favs: [...newFavs],
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage()
      };

    default:
      return state;
  }
}
