using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatSignalR.Models;
using ChatSignalR.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatSignalR.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager,
                                 RoleManager<IdentityRole> roleManager,
                                 SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            //user i tap
            AppUser user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                //tapa bilmedinse error qaytar
                ModelState.AddModelError("", "This account was not found!");
                return View(model);
            }


            //paroluna gor sign in etmeye calis
            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, false, true);
            if (!signInResult.Succeeded)
            {
                //error oldusa geriye qaytar
                ModelState.AddModelError("", "Email or password is incorrect!");
                return View(model);
            }

            return RedirectToAction("List", "Account");
        }


        [Authorize]
        public async Task<IActionResult> List()
        {
            return View(await _userManager.Users.ToListAsync());
        }

        public async Task<IActionResult> LogOut()
        {
            //Offline();
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }

    }
}