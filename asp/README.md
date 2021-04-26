## 使用

对Asp配置麻烦一些，按照下边步骤进行配置。

### 增加Asp解码器

找到`蚁剑的初始化目录\source\modules\settings\encoders.js`文件

在第89行~106行之间加入如下配置

`注意逗号`

```json
{
    id: 'new_asp_decoder',
    icon: 'file-code-o',
    type: 'button',
    text: "ASP"
}
```

![image-20210426235454936](images/README/image-20210426235454936.png)

156行~158行加入如下代码

```javascript
case "new_asp_decoder":
	that.createEncoder(id, 'decoder');
	break;
```

![image-20210426235600728](images/README/image-20210426235600728.png)

### 覆盖模板

建议将`asp`文件夹拷贝一份出来做备份。

将提供好的template文件夹和index.js文件覆盖到`蚁剑的初始化目录\source\core\asp\`目录中

![image-20210426235817096](images/README/image-20210426235817096.png)

`如果蚁剑已开启了，记得重启！`

### 编码器

点击左上角AntSword ---> 系统设置

![image-20210427000157882](images/README/image-20210427000157882.png)

自定义一个名称，后将encoder.js中的内容粘贴进去并保存。

![image-20210427000330333](images/README/image-20210427000330333.png)

### 解码器

![image-20210427000404488](images/README/image-20210427000404488.png)

将decoder.js中的内容粘贴进去并保存，操作和编码器类似。

![image-20210427000553636](images/README/image-20210427000553636.png)

## 连接

默认密码: `data`

将提供好的WebShell进行上传，需要更换密码在WebShell文件中搜索`data`，然后替换值即可。

压缩版: `shell-mini.asp`

未压缩: `shell.asp`

![image-20210427001510231](images/README/image-20210427001510231.png)

## 效果

![image-20210427001547304](images/README/image-20210427001547304.png)

![image-20210427001623801](images/README/image-20210427001623801.png)

![image-20210427001655685](images/README/image-20210427001655685.png)

WebShell访问效果

![image-20210427001726111](images/README/image-20210427001726111.png)