using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[Route("[controller]/[action]")]
public class PostomatController : ControllerBase
{
    [HttpGet]
    public IActionResult Test()
    {
        return Ok();
    }
}