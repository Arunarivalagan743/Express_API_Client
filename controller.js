const user = [
    { id: 1, name: 'arun' },
    { id: 2, name: 'hari' }
];

// GET all users
export const getUsers = (req,res)=>{
    res.send(user);
};

// GET user by id
export const getUserById = (req,res)=>{
    const id = parseInt(req.params.id);

    const matchUser = user.find(u => u.id === id);

    if(!matchUser){
        return res.status(404).send("No user");
    }

    res.send(matchUser);
};

// ADD user
export const addUser = (req,res)=>{
    const newuser = {
        id: user[user.length - 1].id + 1,
        name: req.body.name
    };

    user.push(newuser);

    res.status(201).json(newuser);
};

// UPDATE user
export const updateUser = (req,res)=>{
    const id = parseInt(req.params.id);

    const matchIndex = user.findIndex(u => u.id === id);

    if(matchIndex === -1){
        return res.status(404).send("User not found");
    }

    user[matchIndex] = {
        ...user[matchIndex],
        ...req.body
    };

    res.json(user[matchIndex]);
};