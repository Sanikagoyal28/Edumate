import React from "react";
import axios from "axios";

export default axios.create({
    baseURL:"http://20.226.10.150/api/user/"
})