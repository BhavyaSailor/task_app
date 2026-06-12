const Task = require('../models/task.models');
const User = require('../models/user.models');

const createTask = async (req, res, next)=>{
    try{
        const {title} = req.body;

        if(!title){
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title,
            user : req.user.id
        });

        res.status(201).json(task);
    }
    catch(error){
        next(error);
    }
};

const getTasks = async (req, res, next) => {
  try {
    const filter = {
      user: req.user.id
    };

    // filter by completion status
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === "true";
    }

    // search filter
     if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    //sorting
    const sortBy = req.query.sort || "-createdAt";


    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    

    const tasks = await Task.find(filter)
    .select("-__v").sort(sortBy).skip(skip).limit(limit);

    const totalTasks = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,
      currentpage : page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      count: tasks.length,
      tasks
    });
  }
  catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next)=>{
    try{
        const task = await Task.findOne(
          {
            _id : req.params.id,
            user : req.user.id
          }

        );
        
        if(!task){
            return res.status(404).json({
                message: "task not found"
            })
            
        }
        task.title = req.body.title || task.title;

        if(req.body.completed !== undefined){
            task.completed = req.body.completed
        }
        await task.save();
        res.status(200).json(task);
    }
    catch(error){
        next(error);
    }
};

const deleteTask = async (req, res, next)=>{
    try{
        const task = await Task.findOne({
             _id: req.params.id, 
             user : req.user.id
            });
         if(!task){
            return res.status(404).json({
                message: "task not found"
            })
        }

        await task.deleteOne();

        res.status(200).json({
            message: "deleted successfully"
        });
    
    }
    catch(error){
        next(error);
    }
}

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().select("-__v").sort("-createdAt");
    res.status(200).json({
      success: true,
      tasks
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -__v");
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getAllTasks,
    getAllUsers
};
