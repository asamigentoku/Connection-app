from pwdlib import PasswordHash
password_hash = PasswordHash.recommended()
#ハッシュ化したパスワードを照合
def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

#パスワードをハッシュ化
def get_password_hash(password):
    return password_hash.hash(password)