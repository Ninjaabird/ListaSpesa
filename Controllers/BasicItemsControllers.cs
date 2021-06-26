using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PersonalLibrary.ListaSpesa;
using System.Text.Json;
using System;
using System.Linq;

namespace ListSpesa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetBasicItemsController : ControllerBase
    {
        [HttpPost]
        public List<Item> GetBasicItems()
        {
            if (HttpContext.Session.GetInt32("logged") == 1)
            {
                return BasicEditor.GetBasicItems();
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
    public class StoreBasicItemController : ControllerBase
    {
        [HttpPost]
        public long StoreBasicItem([FromBody] JsonElement data)
        {
            try
            {
                Item item = JsonSerializer.Deserialize<Item>(data.GetRawText());

                if (HttpContext.Session.GetInt32("logged") == 1)
                {
                    long res = BasicEditor.StoreBasic(item);

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
            catch (Exception e)
            {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return 0;
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class EditBasicItemController : ControllerBase
    {
        [HttpPost]
        public bool EditBasicItem([FromBody] JsonElement data)
        {
            try
            {
                Item item = JsonSerializer.Deserialize<Item>(data.GetRawText());

                if (HttpContext.Session.GetInt32("logged") == 1)
                {
                    bool res = BasicEditor.EditBasic(item);
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
    public class DeleteBasicItemController : ControllerBase
    {
        [HttpPost]
        public List<bool> DeleteBasicItem([FromBody] long[] data)
        {
            try
            {
                if (HttpContext.Session.GetInt32("logged") == 1)
                {

                    List<bool> res = new List<bool>();
                    foreach (long num in data) res.Add(BasicEditor.DeleteBasic(num));


                    if (res.All(r => r == true))
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
}
