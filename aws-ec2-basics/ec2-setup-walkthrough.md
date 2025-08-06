# AWS EC2 Setup Walkthrough

## 📌 Objective
Launch and connect to a virtual Linux server using AWS EC2, install a web server, and access it from a browser.

---

## ⚙️ Tools Used
- AWS Free Tier
- EC2 instance (Amazon Linux 2023)
- Git Bash on Windows
- Apache Web Server (httpd)

---

## 🧪 Step-by-Step Process

### 1. EC2 Instance Creation
- Launched a `t2.micro` instance using **Amazon Linux 2023**
- Named the instance: `justin-first-ec2`
- Created a new **key pair**: `justin-ec2-key.pem` and downloaded it
- Opened **port 22 (SSH)** and **port 80 (HTTP)** in the security group

---

### 2. SSH Connection from Windows
Used Git Bash on Windows:
```bash
chmod 400 /c/Users/Justin/Documents/AWS/justin-ec2-key.pem
ssh -i /c/Users/Justin/Documents/AWS/justin-ec2-key.pem ec2-user@<your-public-ip>
```

Successfully logged into the instance.  
✅ Confirmed connection with:
```bash
uname -a
uptime
```

---

### 3. Installed Web Server (Apache)
Inside the EC2 instance:
```bash
sudo yum update -y
sudo yum install httpd -y
sudo systemctl start httpd
```

---

### 4. Tested in Browser
- Navigated to: `http://<your-public-ip>`
- Saw the **“It works!”** Apache confirmation page

---

## 💡 Lessons Learned
- How to launch and secure an EC2 instance using AWS
- SSH key permissions are critical (`chmod 400`)
- How to configure firewall rules (Security Groups)
- Installed and started a basic Linux web server

---

## ✅ Status
**Lab complete** – first successful deployment using AWS EC2 + Apache.  
Looking forward to more cloud and security labs.
