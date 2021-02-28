## 使用

对Jsp配置麻烦一些，按照下边步骤进行配置。

### 增加Jsp解码器

找到`蚁剑的初始化目录\source\modules\settings\encoders.js`文件

在第89行~106行之间加入如下配置，==注意逗号==。

```json
{
    id: 'new_jsp_decoder',
    icon: 'file-code-o',
    type: 'button',
    text: "JSP"
}
```



![image-20210228194649734](images/README/image-20210228194649734.png)

156行~158行加入如下代码

```javascript
case "new_jsp_decoder":
	that.createEncoder(id, 'decoder');
	break;
```

![image-20210228194808703](images/README/image-20210228194808703.png)

### 覆盖模板

==建议将`template`文件夹拷贝一份出来做备份。==

将提供好的template文件夹内的文件覆盖到下边的目录中

`蚁剑的初始化目录\source\core\jsp\template\`

![image-20210228193857608](images/README/image-20210228193857608.png)

==如果蚁剑已开启了，记得重启！==

### 编码器

点击左上角AntSword ---> 系统设置

![image-20210228191111088](images/README/image-20210228191111088.png)

自定义一个名称，后将encoder.js中的内容粘贴进去并保存。

![image-20210228191148279](images/README/image-20210228191148279.png)

### 解码器

将decoder.js中的内容粘贴进去并保存，操作和编码器类似。

![image-20210228191219281](images/README/image-20210228191219281.png)

## 连接

默认密码: `data`

将提供好的WebShell进行上传，需要更换密码在WebShell文件中搜索`data`，然后替换值即可。

![image-20210228191305612](images/README/image-20210228191305612.png)

## 效果

![image-20210228191857083](images/README/image-20210228191857083.png)

![image-20210228191910218](images/README/image-20210228191910218.png)

WebShell访问效果

![image-20210228191515196](images/README/image-20210228191515196.png)
