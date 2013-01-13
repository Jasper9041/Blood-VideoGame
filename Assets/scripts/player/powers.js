#pragma strict

private var decidepower : int = 0;
private var gui : GameObject;
var spawner : Transform;
var colup : boolean = false;		//do not config in unity editor!
var coldown : boolean = false;		//do not config in unity editor!
var player : Transform;
var shield : Transform;
var power1 : int = 0;
var power2 : int = 0;
var power3 : int = 0;
var power4 : int = 0;

function Start () {

}

function Update () {
	/////////////// POWERUP ///////////////
	if (colup){
		decidepower = Random.Range(1,5);
		
			//Check to see what powers are already active so you can add to others instead
		if (power1 == 1 && decidepower == 1){
			decidepower = 2;}
		if (power2 == 1 && decidepower == 2){
			decidepower = 3;}
		if (power3 == 1 && decidepower == 3){
			decidepower = 4;}
		if (power4 == 1 && decidepower == 4){
			decidepower = 1;}
		if (power1 == 1 && power2 == 1 && power3 == 1 && power3 == 4){		//check to see if all powers are active (prevents +2)
			spawner.GetComponent(PowerSpawner).stoppowerupspawn = true;
			colup = false;
			return;
		}
		
		if (power1 == -1){		//if there is a negative power add to that first
			decidepower = 1;
		}else if (power2 == -1){
			decidepower = 2;
		}else if (power3 == -1){
			decidepower = 3;
		}else if (power4 == -1){
			decidepower = 4;}
		
		if (decidepower == 1){	//check what power 
			if (power1 == 0){	//check state of power
				power1 += 1;	//set state of power
				setpower1(1);	//start powerup script (1-> powerup ; 0 -> normal ; -1 -> powerdown)
			}else if (power1 == -1){
				power1 += 1;
				setpower1(0);		
			}
		}else if (decidepower == 2){
			if (power2 == 0){
				power2 += 1;
				setpower2(1);
			}else if (power2 == -1){
				power2 += 1;
				setpower2(0);
			}
		}else if (decidepower == 3){
			if (power3 == 0){
				power3 += 1;
				setpower3(1);
			}else if (power3 == -1){
				power3 += 1;
				setpower3(0);	
			}
		}else if (decidepower == 4){
			if (power4 == 0){
				power4 += 1;
				setpower4(1);
			}else if (power4 == -1){
				power4 += 1;
				setpower4(0);	
			}
		}
		
		if (power1 == 1 && power2 == 1 && power3 == 1 && power4 == 1){		//check to see if all powers are active
			spawner.GetComponent(PowerSpawner).stoppowerupspawn = true;
		}
		
		colup = false;		//stop update
		
		/////////////// POWERDOWN ///////////////
	}else if (coldown){
		spawner.GetComponent(PowerSpawner).stoppowerupspawn = false;
		decidepower = Random.Range(1,5);
		
		if (power1 == -1 && decidepower == 1){
			decidepower = 2;}
		if (power2 == -1 && decidepower == 2){
			decidepower = 3;}
		if (power3 == -1 && decidepower == 3){
			decidepower = 4;}
		if (power4 == -1 && decidepower == 4){
			decidepower = 1;}
		if (power1 == -1 && power2 == -1 && power3 == -1 && power4 == -1){
			//Debug.Log("You died!");		//End of the line (=dead)
			coldown = false;
			Application.LoadLevel(0);
		}
		
		if (power1 == 1){
			decidepower = 1;
		}
		if (power2 == 1){
			decidepower = 2;
		}
		if (power3 == 1){
			decidepower = 3;
		}
		if (power4 == 1){
			decidepower = 4;
		}
		if (decidepower == 1){
			if (power1 == 0){
				power1 -= 1;
				setpower1(-1);
			}else if (power1 == 1){
				power1 -= 1;
				setpower1(0);
			}
		}else if (decidepower == 2){
			if (power2 == 0){
				power2 -= 1;
				setpower2(-1);
			}else if (power2 == 1){
				power2 -= 1;
				setpower2(0);
			}
		}else if (decidepower == 3){
			if (power3 == 0){
				power3 -= 1;
				setpower3(-1);
			}else if (power3 == 1){
				power3 -= 1;
				setpower3(0);		
			}
		}else if (decidepower == 4){
			if (power4 == 0){
				power4 -= 1;
				setpower4(-1);
			}else if (power4 == 1){
				power4 -= 1;
				setpower4(0);		
			}
		}
		coldown = false;
		
		if (power1 == -1 && power2 == -1 && power3 == -1 && power4 == -1){
			//Debug.Log("You died!");		//End of the line (=dead)
			Application.LoadLevel(0);
		}
	}
	
	/////////////// EXTRA CHECK FOR POWERUPS ///////////////
	if (power1 == 1 && power2 == 1 && power3 == 1 && power4 == 1){
		spawner.GetComponent(PowerSpawner).stoppowerupspawn = true;
		var powerup : GameObject = GameObject.FindWithTag("powerup");
		if (powerup){				//remove powerups if all powerups are active
			Destroy(powerup);
		}
	}
		
	//show powers in GUI
	gui = GameObject.Find("GUI");
    gui.GetComponent(GUIscript).powers = power1+" "+power2+" "+power3+" "+power4;

}

function OnTriggerEnter(collider : Collider) {
	if (collider.gameObject.tag == "powerup"){
		colup = true;
    }else if (collider.gameObject.tag == "powerdown"){
		coldown = true;					
	}
}


/////////////// SETTING POWERS ///////////////


function setpower1(type : int){			//shield
	if (type == 1){
		var ShieldPos:Vector3;
		ShieldPos = player.transform.position;
		ShieldPos.z += 2;
		Instantiate(shield,ShieldPos,shield.rotation);
		player.GetComponent(shooting).bulletExtraZPos = 2.5;
		
	}else if (type == 0){
		if (coldown){
			var existingShield : GameObject = GameObject.FindWithTag("shield");
			Destroy(existingShield);
			player.GetComponent(shooting).bulletExtraZPos = 1;
		}
	}else if (type == -1){
		//Extra Life
	}
}

function setpower2(type : int){			//shootingspeed
	if (type == 1){
		player.GetComponent(shooting).shootdelay = 0.1;
		
	}else if (type == 0){
		player.GetComponent(shooting).shootdelay = 0.2;
		
	}else if (type == -1){
		//Extra Life
		
	}
}

function setpower3(type : int){			//bullets
	if (type == 1){
		player.GetComponent(shooting).shoottype = "triple";
		
	}else if (type == 0){
		player.GetComponent(shooting).shoottype = "single";
		
	}else if (type == -1){
		//Extra Life
	}
}

function setpower4(type : int){			//cooldowns
	if (type == 1){
		//longer cooldowns
		
	}else if (type == 0){
		//normal cooldown
		
	}else if (type == -1){
		//Extra Life
	}
}