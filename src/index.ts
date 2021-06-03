import "reflect-metadata";
import {createConnection} from "typeorm";
import { Post } from "./entity/Post";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    const post = new Post();
    post.text = 'Post'
    post.user = user;
    await connection.manager.save(post);

    console.log("Loading post from the database...");
    const p1 = await connection.manager.findOne(Post, post.id);
    console.log("User id of the post: ", p1.user.id);

    console.log("Remove user from database...");
    await connection.manager.delete(User, {id: user.id});

    const p2 = await connection.manager.findOne(Post, post.id);
    console.log(p2);
    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
