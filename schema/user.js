const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('zj_users',{
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            //allowNull: true,
            autoIncrement: true
        },
				//用户名
        user_ip:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_ip' // 同等于sql 中as 别名  对数据无实质影响
        },
        //用户名
        user_name:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_name'
        },
        //用户密码
        user_password:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_password'
        },
        //用户昵称
        user_nickname:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_nickname'
        },
        //用户邮箱
        user_email:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_email'
        }, 
        //头像
        user_profile_photo:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_profile_photo'
        }, 
        //等级
        user_level:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_level'
        }, 
        //简介
        user_text:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_text'
        }, 
        //生日
        user_birthday:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_birthday'
        }, 
        //手机号
        user_telephone_number:{
            type: DataTypes.STRING,
           // allowNull: false,
            field: 'user_telephone_number'
        }, 
        //注册时间
        user_registration_time:{
						defaultValue:new Date(),
            type: DataTypes.DATE,
            field: 'user_registration_time'
        },  
        // 更新时间
        user_update_time:{
						defaultValue:new Date(),
            type: DataTypes.DATE
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true, 
				timestamps: false
    });
}