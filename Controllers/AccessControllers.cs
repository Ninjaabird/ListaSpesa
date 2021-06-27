using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using PersonalLibrary;
using System.Text.Json;
using MySql.Data.MySqlClient;

namespace ListSpesa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public bool Login(JsonElement data)
        {
            
            
            if(HttpContext.Session.GetInt32("logged")==1) 
            {
                HttpContext.Response.StatusCode = 201;
                return false;
            }
            else
            {
                MySqlConnection conn = MySqlDataGetter.createConnection("listaspesa");

                try
                {
                    LoginData loginData = JsonSerializer.Deserialize<LoginData>(data.GetRawText());

                    conn.Open();

                    MySqlCommand command = new MySqlCommand();

                    command.CommandText = "SELECT password1 FROM SpesaUsers WHERE nome=@nome";

                    command.Parameters.Add("@nome", MySqlDbType.Text);
                    command.Parameters["@nome"].Value = loginData.email;

                    command.Connection = conn;

                    MySqlDataReader reader = command.ExecuteReader();

                    reader.Read();

                    if(reader.GetString(0)==loginData.password)
                    {
                        HttpContext.Session.SetInt32("logged", 1);

                        HttpContext.Response.StatusCode = 200;
                        reader.Dispose();
                        conn.Dispose();
                        return true;
                    }
                    else
                    {
                        reader.Dispose();
                        conn.Dispose();
                        HttpContext.Response.StatusCode = 202;
                        return false;
                    }
                }
                catch(Exception e)
                {
                    Console.WriteLine(e);
                    HttpContext.Response.StatusCode = 203;
                    conn.Dispose();
                    return false;
                }

            }
        }
    }



    [ApiController]
    [Route("[controller]")]
    public class AccessController : ControllerBase
    {
        [HttpPost]
        public bool Access()
        {
            if(HttpContext.Session.GetInt32("logged")==1)
            {
                HttpContext.Response.StatusCode = 200;
                return true;
            }
            else
            {
                HttpContext.Response.StatusCode = 201;
                return false;
            }
        }
    }
}
