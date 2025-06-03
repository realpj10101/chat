using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(IAccountRepository accountRepository) : ControllerBase
{

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(AppUser user, CancellationToken cancellationToken)
    {
        AppUser appUser = await accountRepository.RegisterAsync(user, cancellationToken);

        return appUser;
    }
}