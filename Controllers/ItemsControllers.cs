using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PersonalLibrary.ListaSpesa;
using PersonalLibrary;
using System.Text.Json;
using MySql.Data.MySqlClient;
using System;
using System.Linq;

namespace ListSpesa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetItemsController : ControllerBase
    {
        [HttpPost] 
        public List<Item> GetItems()
        {
            if(HttpContext.Session.GetInt32("logged")==1)
            {
                return ItemEditor.GetItems();
            }
            else
            {
                HttpContext.Response.StatusCode = 201;
                return new List<Item>();
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class StoreItemController : ControllerBase
    {
        [HttpPost]
        public long StoreItem([FromBody] JsonElement data)
        {
            try
            {
                Item item = JsonSerializer.Deserialize<Item>(data.GetRawText());


                if (HttpContext.Session.GetInt32("logged") == 1)
                {
                    long res = ItemEditor.StoreItem(item);

                    AutocompleteEditor.StoreAutocomplete(item);

                    if (res > 0)
                    {
                        HttpContext.Response.StatusCode = 200;
                        return res;
                    }
                    else
                    {
                        HttpContext.Response.StatusCode = 202;
                        return res;
                    }
                }
                else
                {
                    HttpContext.Response.StatusCode = 201;
                    return 0;
                }
            }
            catch (Exception e) {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return 0;
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class EditItemController : ControllerBase
    {
        [HttpPost]
        public bool EditItem([FromBody] JsonElement data)
        {
            try
            {
                Item item = JsonSerializer.Deserialize<Item>(data.GetRawText());

                if (HttpContext.Session.GetInt32("logged") == 1)
                {

                    bool res = ItemEditor.EditItem(item);

                    if (res)
                    {
                        HttpContext.Response.StatusCode = 200;
                        return res;
                    }
                    else
                    {
                        HttpContext.Response.StatusCode = 202;
                        return res;
                    }
                }
                else
                {
                    HttpContext.Response.StatusCode = 201;
                    return false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return false;
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class DeleteItemController : ControllerBase
    {
        [HttpPost]
        public List<bool> DeleteItem([FromBody] long[] data)
        {
            try
            {
                if (HttpContext.Session.GetInt32("logged") == 1)
                {

                    List<bool> res = new List<bool>();
                    foreach(long num in data) res.Add(ItemEditor.DeleteItem(num));


                    if (res.All(r=>r==true))
                    {
                        HttpContext.Response.StatusCode = 200;
                        return res;
                    }
                    else
                    {
                        HttpContext.Response.StatusCode = 202;
                        return res;
                    }
                }
                else
                {
                    HttpContext.Response.StatusCode = 201;
                    return new List<bool>();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return new List<bool>();
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class BasicListToItemListController:ControllerBase
    {
        [HttpPost]
        public bool BasicListToItemList()
        {
            if(HttpContext.Session.GetInt32("logged")==1)
            {
                MySqlConnection conn=MySqlDataGetter.createConnection("ListaSpesa");

                MySqlCommand command = new MySqlCommand();

                command.CommandText = "INSERT INTO lista SELECT null,nome,quantita,offertaAldi,offertaLidl,prezzo,ordineLidl,ordineAldi,0" +
                    " FROM lista WHERE lista.tipo=1 AND lista.nome NOT IN (SELECT nome FROM lista WHERE tipo=0);";

                command.Connection = conn;

                int result;
                try
                {
                    conn.Open();
                    result = command.ExecuteNonQuery();
                    conn.Dispose();
                    command.Dispose();
                }
                catch(Exception e)
                {
                    Console.WriteLine(e);
                    conn.Dispose();
                    command.Dispose();
                    return false;
                }
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
