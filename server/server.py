from http.server import BaseHTTPRequestHandler, HTTPServer
import json


class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 设置响应头
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # 允许所有来源跨域访问，也可以设置为特定的域名
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')  # 允许的请求方法
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')  # 允许的请求头
        self.end_headers()

        # 读取请求体数据
        content_length = int(self.headers['Content-Length'])
        post_data_bytes = self.rfile.read(content_length)


        # 将字节对象解码为字符串
        data_str = post_data_bytes.decode('utf-8')

        # 查找并提取 rowData 对应的内容
        start_index = data_str.find('rowData')

        if start_index != -1:
            start_index = data_str.find('[', start_index)
            end_index = data_str.rfind(']')
            rowData_str = data_str[start_index+1:end_index]
            rowData_str = rowData_str.replace('\\', '')

            rows = []
            rowData = rowData_str.split(',')
            for data in rowData:
                data_str = data.split(":")[1].replace('"', '')
                rows.append(data_str)

            index = 0

            # 打开文件以写入模式
            with open('/data/workspace/myshixun/step2/output.txt', 'w') as file:
                # 去除最后一行的打印内容
                while index < len(rows)-8:
                    # 将每一行数据写入文件
                    file.write(','.join(rows[index : index + 4]) + '\n')
                    index = index + 8


        print('over')
        # 发送响应给前端
        response = json.dumps({'message': 'Data received successfully!'})
        self.wfile.write(response.encode('utf-8'))

    def do_OPTIONS(self):
        # 设置响应头
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')  # 允许所有来源跨域访问，也可以设置为特定的域名
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')  # 允许的请求方法
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')  # 允许的请求头
        self.end_headers()


def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('127.0.0.1', port)
    httpd = server_class(server_address, handler_class)
    print('Starting server on port {port}...')
    httpd.serve_forever()


run()

